namespace Codesophy.Process.Parse
{
    /// <summary>
    /// TODO:
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public interface ITokenStream<TValue>
    {
        Token<TValue> Read();
    }
}
