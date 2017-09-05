using NPandora.Feature;

namespace NPandora.Model.Transformation
{
    /// <summary>
    /// TODO:Responsible for defining transformation contract bwetween
    /// <typeparamref name="TRequest">request</typeparamref> and
    /// <typeparamref name="TResponse">response</typeparamref>.
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    /// <typeparam name="TResponse"></typeparam>
    public interface ITransformation<TRequest, TResponse>
        : IFeature<TRequest, TResponse>
    {

    }
}
