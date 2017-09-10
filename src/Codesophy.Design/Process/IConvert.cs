namespace Codesophy.Process
{
    /// <summary>
    /// TODO:Responsible for conversion bwetween
    /// <typeparamref name="TSource">source</typeparamref> and
    /// <typeparamref name="TDestination">destination</typeparamref> types.
    /// </summary>
    /// <typeparam name="TSource"></typeparam>
    /// <typeparam name="TDestination"></typeparam>
    /// TODO:More detailed explanation of differences in semantics between IConvert,
    /// IMap, etc.
    public interface IConvert<TSource, TDestination>
        : IFeature<TSource, TDestination>
    {

    }
}
