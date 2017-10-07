namespace Codesophy.Model.Code
{
    /// <summary>
    /// TODO:Function's parameter.
    /// </summary>
    public interface IParameterExpression
        : IExpression
        , IHasName
    {
        ITypeReferenceExpression Type { get; }

        IConstantExpression DefaultValue { get; }

        //TODO:Modifier (ref, out, SQL's OUTPUT, etc.).
    }
}
