namespace Codesophy.Model.Code
{
    /// <summary>
    /// TODO: Variable definition.
    /// </summary>
    public interface IVariableExpression
        : IExpression
        , IHasName
    {
        ITypeReferenceExpression Type { get; }

        IConstantExpression Value { get; }
    }
}
