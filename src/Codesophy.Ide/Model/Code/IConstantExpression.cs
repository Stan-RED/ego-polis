namespace Codesophy.Model.Code
{
    /// <summary>
    /// TODO:Code expression for constants. Each constant has just its
    /// <see cref="Value"/>.
    /// </summary>
    public interface IConstantExpression
    {
        object Value { get; }
    }
}
