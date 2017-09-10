namespace Codesophy.Process
{
    /// <summary>
    /// This interface is responsible for being a fundamental "atom" of the application.
    /// </summary>
    /// <typeparam name="TGiven">
    /// Structure of the information that is provided to the feature.
    /// </typeparam>
    /// <typeparam name="TResult">
    /// Structure of the result we expect from the future.
    /// </typeparam>
    /// <remarks>
    /// <para>
    /// If we purify some application's feature from its representation (e.g. UI input/output),
    /// then it becomes a clean concept where we have some <typeparamref name="TGiven"/> as
    /// input and expects <typeparamref name="TResult"/> from the feature.
    /// </para>
    /// 
    /// <para>
    /// Such design was based on some 
    /// </para>
    /// 
    /// <para>
    /// Such atomic concept has several advantages. The first is its atomicity (SRP) to have
    /// the SOLID design.
    /// </para>
    /// 
    /// <para>
    /// Compared to another "atom" like function it may have another services injected
    /// by IoC-container for example. Also it has not so strict signature as functions
    /// have. For example, the same object instance may be processed by different
    /// <see cref="IFeature{TGiven,TResult}">features</see> that will use only some
    /// part (polymorphic) or interface from this instance.
    /// </para>
    /// 
    /// <para>
    /// The idea of the feature also coupled with BDD and its Given-When-Then pattern.
    /// </para>
    /// 
    /// </remarks>
    public interface IFeature<in TGiven, out TResult>
    {
        /// <summary>
        /// Produce the feature results for the <paramref name="given"/> input.
        /// </summary>
        /// <param name="given">
        /// Feature's input.
        /// </param>
        /// <returns>
        /// Result, expected from the feature.
        /// </returns>
        TResult When(TGiven given);
    }
}
