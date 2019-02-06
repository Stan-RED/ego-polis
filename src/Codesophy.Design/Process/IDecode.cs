namespace Codesophy.Process
{
    public interface IDecode<TCode, TResult>
        : IFeature<TCode, IResult<TResult>>
    {

    }
}
