using System;

namespace Codesophy.Quality
{
    /// <summary>
    /// TODO:Specification is responsible for features testing in a BDD style.
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    /// <typeparam name="TResponse"></typeparam>
    /// <remarks>
    /// <para>
    /// TODO:Having some initial environment provided <see cref="Given"/>,
    /// <typeparamref name="TRequest">request</typeparamref> sample is returned by
    /// <see cref="When"/> and then <typeparamref name="TResponse">response</typeparamref>
    /// checked in <see cref="Then(TResponse)"/>.
    /// </para>
    /// 
    /// TODO:Primitive implementations like EqualSpecification.
    /// </remarks>
    public abstract class Specification<TRequest, TResponse>
        : ISpecification
    {
        protected virtual void Given() { }

        protected abstract TRequest When { get; }

        protected virtual void Then(TResponse response) { }

        Exception ISpecification.Check()
        {
            Given();

            try
            {
                var request = When;
                //TODO:response = Execute/Resolve
                //TODO:Then(response)
            }
            catch (Exception e)
            {
                return e;
            }

            return null;
        }
    }
}
