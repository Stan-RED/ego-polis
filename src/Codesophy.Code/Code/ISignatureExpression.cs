using System.Collections.Generic;

namespace Codesophy.Code
{
    /// <summary>
    /// TODO:Function signature.
    /// </summary>
    public interface ISignatureExpression : IExpression
    {
        ITypeReferenceExpression ReturnType { get; }

        IEnumerable<IParameterExpression> Parameters { get; }
    }
}
