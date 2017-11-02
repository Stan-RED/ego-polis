# Implicity of explicitly typed local variables

C# 3.0 introduced new "var" keyword to simplify local variable type declaration,
when its type can be inferred from the associated initializer expression like
this:

```
// This is how it was before
Dictionary<string, Foo> v1 = new Dictionary<string, Foo>();

// And the same declaration using new "var" keyword
var v2 = new Dictionary<string, Foo>();
```

This implicit type declaration definitely looks shorter, especially for hairy
declarations like this:

```
ConcurrentDictionary<EnvironmentVariableTarget, LinkedListNode<SomeHairyClassName>> hairy = new ConcurrentDictionary<EnvironmentVariableTarget, LinkedListNode<SomeHairyClassName>>();
```

Those make code barely readable without horizontal scrolling. But this feature
caused a lot of debates that it will conversely degrade the readability, not
improve it. And almost nobody speaks about a big internal difference, focusing
on how it looks like.

Let’s start from the sample and consider a schema taken from the real case. We
have a system that heavily works with money transactions. Initially
System.Decimal data type was used, but for performance purposes we decided to
replace it with System.Int32 (number of cents). Thus, we updated our interfaces
and related implementations using "int" type, e.g.:

```
public class DefaultCalculator : ICalculator
{
    ...

    int ICalculator.Calculate() => ...;

    ...
}
```

In code we widely consumed results of such functions and presumably preferred
explicit type declarations.

```
decimal calculated = calculator.Calculate();
Console.WriteLine(calculated);
```

Do we get any errors or warnings after changing the resulting type of the
Calculate() method? No. So finding all such occurences and fixing sounds
tricky... But maybe there is no problem at all and this code will work well as
soon as it compiles without failures? Let’s open the hood and look at MSIL code
generated.

```
callvirt instance int32 App.ICalculator::Calculate()
call valuetype [mscorlib]System.Decimal [mscorlib]System.Decimal::op_Implicit(int32)
stloc.1
ldloc.1
call void [mscorlib]System.Console::WriteLine(valuetype [mscorlib]System.Decimal)
```

What was the logic that guide us when we were writing our code? I think that all
we want - just assign the value to the local variable and pass it to some function
(we simplified this by calling Console.WriteLine). But what did we get?

Firstly we got unexpected conversion operation (call to
System.Decimal::op_Implicit(int32) method). Secondly we expected that
Console.WriteLine(int value) overload should be called. Not its System.Decimal
version. Of course, for this particular method it’s not a big issue as it just
renders the value to console. But it demonstrates that we lose control on our
application and it may call method overload that we don’t expect.

**So it is important to understand that by using an explicitly typed
declaration you didn’t simply ask to assign a value. You statement was: "Try
to cast expression on the right to the type on the left".**

On the other side, let's suppose that initially we used implicitly typed
variables:

```
var calculated = calculator.Calculate();
Console.WriteLine(calculated);
```

And result completely synchronizes with our logic. We simply take the calculated
value and send it to the proper method (proper overload).

```
callvirt instance int32 App.ICalculator::Calculate()
stloc.2
ldloc.2
call void [mscorlib]System.Console::WriteLine(int32)
```

If we take a look at the compiled code, it turns out that most of our efforts
to achieve better performance were degraded but these unexpected computations:

```
            decimal calculated = calculator.Calculate();
00007FF8783C04DA  mov         rcx,qword ptr [rbp+70h]  
00007FF8783C04DE  mov         r11,7FF8782C0020h  
00007FF8783C04E8  cmp         dword ptr [rcx],ecx  
00007FF8783C04EA  call        qword ptr [r11]  
00007FF8783C04ED  mov         dword ptr [rbp+4Ch],eax  
00007FF8783C04F0  lea         rcx,[rbp+38h]  
00007FF8783C04F4  mov         edx,dword ptr [rbp+4Ch]  
00007FF8783C04F7  call        00007FF8D442E9B0  
00007FF8783C04FC  vmovdqu     xmm0,xmmword ptr [rbp+38h]  
00007FF8783C0502  vmovdqu     xmmword ptr [rbp+60h],xmm0  
            Console.WriteLine(calculated);
00007FF8783C0508  vmovdqu     xmm0,xmmword ptr [rbp+60h]  
00007FF8783C050E  vmovdqu     xmmword ptr [rbp+20h],xmm0  
00007FF8783C0514  lea         rcx,[rbp+20h]  
00007FF8783C0518  call        00007FF8D4419E70  

...implicitly typed version...

            var calculated = calculator.Calculate();
00007FF8783C051E  mov         rcx,qword ptr [rbp+70h]  
00007FF8783C0522  mov         r11,7FF8782C0028h  
00007FF8783C052C  cmp         dword ptr [rcx],ecx  
00007FF8783C052E  call        qword ptr [r11]  
00007FF8783C0531  mov         dword ptr [rbp+34h],eax  
00007FF8783C0534  mov         ecx,dword ptr [rbp+34h]  
00007FF8783C0537  mov         dword ptr [rbp+5Ch],ecx  
            Console.WriteLine(calculated);
00007FF8783C053A  mov         ecx,dword ptr [rbp+5Ch]  
00007FF8783C053D  call        00007FF8D4419F00  
```

## Is it obsolete?

At the moment you might decide that explicit type declaration does not worth
to use at all. And that's wrong. Let's consider another part of our sample
application.

```
...
ICalculator calculator = new DefaultCalculator();
...
```

Why did I use explicit declaration here? Because my logic in this case sounds
differently. I'm following the DIP (Dependency Inversion Principle) and going
to work with abstraction (ICalculator interface in this case) instead of some
particular implementation. That is why I explicitly typed the contract I want
to receive.

## Resume

I believe the usage rules of "var" keyword are pretty clear. If you simply
want to assign value to some variable — use this feature. Use explicit type
declaration when you want to get exact contract from some instance because
such declaration will launch internal implicit casting conversions.
