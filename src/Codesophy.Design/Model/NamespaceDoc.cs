using System.Runtime.CompilerServices;

namespace Codesophy.Model
{
    /// <summary>
    /// Models along with <see cref="Codesophy.Process">processes</see> are the
    /// vital part of application.
    /// </summary>
    /// 
    /// <remarks>
    /// <para>
    /// The legendary computer scientist Niklaus Wirth was also famous for
    /// it's book "Algorithms + Data Structures = Programs" that is very close
    /// to the our <see cref="Codesophy.Model"/> + <see cref="Codesophy.Process"/>
    /// pattern. Technically each application is just an input model processed
    /// into some output model.
    /// </para>
    /// 
    /// <para>
    /// As example we can consider some application's concerns those are
    /// covered by this namespace. For instance such behaviour as validation.
    /// Basically it is a <see cref="Codesophy.Process.Validation">process</see>
    /// that accepts some structure that should be validated. But it's response
    /// should be a scalable <see cref="Codesophy.Model.Validation">model</see>
    /// rather than simple true/false or <see cref="System.Exception"/> with
    /// a string.
    /// </para>
    /// 
    /// <para>
    /// Another important conventions for relations between models like
    /// <see cref="Codesophy.Model.Relation.IEntity{TEntity}">entities</see>
    /// are defined in <see cref="Codesophy.Model.Relation"/>.
    /// </para>
    /// 
    /// </remarks>
    [CompilerGenerated]
    internal class NamespaceDoc
    {

    }
}
