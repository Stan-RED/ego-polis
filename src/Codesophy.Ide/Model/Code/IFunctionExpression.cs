namespace Codesophy.Model.Code
{
    /// <summary>
    /// TODO:
    /// </summary>
    public interface IFunctionExpression : IExpression
    {
        ISignatureExpression Signature { get; }

        //TODO:IBlockExpression Body
    }
}
