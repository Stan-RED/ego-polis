using Codesophy.Domain;

namespace Codesophy.Process
{
    /// <summary>
    /// TODO:Responsible for defining transformation contract bwetween
    /// <typeparamref name="TRequest">request</typeparamref> and
    /// <typeparamref name="TResponse">response</typeparamref>.
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    /// <typeparam name="TResponse"></typeparam>
    /// TODO:Probably it should be a part of feature/processing namespace and
    /// called "ITransform".
    public interface ITransform<TRequest, TResponse>
        : IFeature<TRequest, TResponse>
    {

    }
}
