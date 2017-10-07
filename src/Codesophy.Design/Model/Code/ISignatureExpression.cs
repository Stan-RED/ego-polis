using System.Collections.Generic;

namespace Codesophy.Model.Code
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
