using System;
using Codesophy.Model;

namespace Codesophy.Code.Sql
{
    /// <summary>
    /// TODO:
    /// </summary>
    public class SqlVariableExpression
        : SqlExpression
        , IVariableExpression
    {
        /// <summary>
        /// TODO:
        /// </summary>
        ITypeReferenceExpression IVariableExpression.Type => throw new NotImplementedException();

        /// <summary>
        /// TODO:
        /// </summary>
        IConstantExpression IVariableExpression.Value => throw new NotImplementedException();

        /// <summary>
        /// TODO:
        /// </summary>
        string IHasName.Name => throw new NotImplementedException();
    }
}
