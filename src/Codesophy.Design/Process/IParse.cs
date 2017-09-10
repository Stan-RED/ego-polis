namespace Codesophy.Process
{
    /// <summary>
    /// TODO:Responsible for parsing <typeparamref name="TSource">source</typeparamref>
    /// into <typeparamref name="TDestination">destination</typeparamref>.
    /// </summary>
    /// <typeparam name="TSource"></typeparam>
    /// <typeparam name="TDestination"></typeparam>
    /// TODO:More detailed explanation of differences in semantics between IConvert,
    /// IMap, IParse, etc.
    /// TODO: IParseStream
    public interface IParse<TSource, TDestination>
        : IFeature<TSource, TDestination>
    {

    }
}
