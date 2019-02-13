namespace Codesophy.Process
{
    public interface IFeature<TSpecification, TProduct>
    {
        IFeature<TSpecification, TSpecification> Execute { get; }
    }
}
