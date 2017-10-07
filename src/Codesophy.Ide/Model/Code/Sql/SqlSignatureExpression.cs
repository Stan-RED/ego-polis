using System.Collections.Generic;

namespace Codesophy.Model.Code.Sql
{
    /// <summary>
    /// TODO:
    /// </summary>
    public class SqlSignatureExpression
        : SqlExpression
        , ISignatureExpression
    {
        /// <summary>
        /// TODO:
        /// </summary>
        ITypeReferenceExpression ISignatureExpression.ReturnType => throw new System.NotImplementedException();

        /// <summary>
        /// TODO:
        /// </summary>
        IEnumerable<IParameterExpression> ISignatureExpression.Parameters => throw new System.NotImplementedException();
    }
}
