using System.Runtime.CompilerServices;

namespace Codesophy.Composition
{
    /// <summary>
    /// TODO:
    /// </summary>
    /// <remarks>
    /// 
    /// TODO:Purposes. Define application patterns (console app, windows service,
    /// multi-tier, etc.), reusable parts of applications. E.g. security, diagnostics.
    /// 
    /// <para>
    /// TODO:Composition is responsible for building application from smaller blocks
    /// down to "atoms". E.g. Application = Security + Infrastructure + ...
    /// Security = Authentication + Authorization + .... Authentication = Identifying
    /// + Hashing + .... One of the main idea is to have ready to use wireframes for
    /// different application types, e.g. web application.
    /// </para>
    /// 
    /// <para>
    /// We ferquently see it as a part of IoC/DI containers, but better
    /// to separate this concept. Let's imagine we want to build an application from
    /// existing blocks. SecurityComposition made by vendor A, that is based on Autofac
    /// and ConfigurationComposition by vendor B that is respectively based on Unit
    /// imagine we want to reuse some SecurityComposition, that makes a lot of things
    /// out of the box. But it depends on NInject.
    /// </para>
    /// 
    /// TODO:Basic composition class. Composition operations and logic (and, or, ...).
    /// Aggregating compositions, quick compositions (like Func/Action composition).
    /// 
    /// </remarks>
    [CompilerGenerated]
    internal class NamespaceDoc
    {

    }
}
