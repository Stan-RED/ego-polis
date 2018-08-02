using Codesophy.Model;

namespace Codesophy.Code.Sql
{
    /// <summary>
    /// TODO:
    /// </summary>
    public class SqlParameterExpression
        : SqlExpression
        , IParameterExpression
    {
        /// <summary>
        /// TODO:
        /// </summary>
        ITypeReferenceExpression IParameterExpression.Type => throw new System.NotImplementedException();

        /// <summary>
        /// TODO:
        /// </summary>
        IConstantExpression IParameterExpression.DefaultValue => throw new System.NotImplementedException();

        /// <summary>
        /// TODO:
        /// </summary>
        string IHasName.Name => throw new System.NotImplementedException();
    }
}
