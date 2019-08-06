## Docs

Based on [VuePress ](https://v1.vuepress.vuejs.org/) (/docs folder).

```
	# Install VuePress globally
	yarn global add vuepress
	
	# Run docs in dev (watch) mode
	yarn docs:dev
	
	# Build docs
	yarn docs:build
```

Recommended plugin for Vue development - [Vetur](https://vuejs.github.io/vetur/)
(octref.vetur).

## Philosophy
TODO:Old notes below are far from being actual. Probably some of the should be
moved to SDE.

This project is an experimental laboratory where we're trying to look at the
software design process and application code from more phylosophical,
fundamental point of view.

### Curiosity

TODO:Never afraid of frightening experiments.

### Diversity

TODO:This is not a strongly focused project, contrarily we will try to absorb
a lot of different subprojects to ensure that Codesophy works well everywhere
and its code philosophy is really fundamental.

### Necessity

TODO:Even being an experimental laboratory it's not for satisfying curiosity
only, it's intended to help with real projects.

### Codesity

Documentation, e2e-testing, deployment and any other stage of the software
development lifecycle should be preferrably based on the code as a SSOT
(single point of truth) and be powered by code as much as possible. We
frequently come across "code-first" statements mentioned. That's it.

For this purpose the code should be very expressive and beatiful, like a
poem.

### Atomicity

Looking for fundamental solutions we should be based on the most atomic
concepts those give the most flexibility. This principle is strongly involved
in software design principles like well-known SoC (Separation of concerns),
SRP (Single responsibility principle), decoupling and others.

## Structure

TODO:

### Codesophy.Design

The world is full-filled with huge amount of libraries, frameworks, utils, etc
with one big problem. Almost each one introduces it's own contracts,
vocabularies and build ont its own fundament of conventions. Let's look into
IoC tools for instance. There are 30+ different implementations for .NET and a
huge zoo of approaches. There is no even simple IDependencyResolver contract
that we can expect from all of them.

This assembly contains minimum amount of implementations and is mostly
responsible for defining ubiquitous language for software design models and
processes.


## Coding rules

TODO:
* [Implicitly typed variables](media/2017/10/implicit-vs-explicit-vars/index.md)

### Class layout

Class layout is not responsible for code navigation. For such purpose we have
shortcuts in our IDEs. Layout is for reading. Therefore its content is better
to serve from the most important part like main responsibilities and interfaces
implemented down to details of implementation.

It should be like a book, where initial methods give us an overview like a
book's table of content.

And the same code flow works well also for authors if they use TDD approach.
Firstly main interfaces are implemented, red-tested and only then we go down.

Interface implementation and related members (private fields, methods, etc
those are developer to support this interface) may be grouped together in one
section and likely to be put into [Code region](#code-regions).

Q: Constructors first?
A: In a properly designed class, constructor is just a boring place where
   dependencies are injected and assigned to class members. Absolutely no
   reason to see it first. 

### Explicit interfaces

Explicit interfaces are the preferrable way to implement in classes. Reasons
are:

* Forces DI principle. You can't access methods define by explicit interfaces
  using particular class. Instead you should use this interface, so code
  depends on abstractions and that's a main requirement of DI principle.
* Good for refactoring. If you update an interface (e.g. remove some method),
  application can't be compiled until implementations will be updated. Implicit
  interface implementation just let you leave this redundant method.
* Better state protection. If you have property with only getter declared, you
  can easily make a mistake and get both getter and setter existing in implicit
  implementation.
* No name conflicts if we implement to interfaces having same member names. May
  be a good option for generic interfaces.
* Members declarations are self-explaining so easier to read the code.

### Code regions

There are a lot of region haters, but I'm not the member of this sect. The
reason is the same as for [Class Layout](#class-layout). For code navigation
I use shortcuts and do not notice two additional lines of code for the region.
But for code organization and reading purposes regions are very good. They
are a kind of "shelves", "table of content" where you can organize your books
instead of a big pile where some interface method may be through constructors
and so on.

So if you have some groups of members (constructors, interface members, tests
related to some specific method, extensions methods with common behaviour,
etc), regions are welcomed.

### Overprotection

Usually we have a habbit to mark as much class members as possible to be
private, internal, protected. This works well for when we are defending state
of this class instance. But it works not good when we are protecting members
those are not responsible for the state. Like constants. Give them a chance to
be reused. Stop protecting them.
