namespace Codesophy.Model.Code.Sql
{
    /// <summary>
    /// TODO: SQL constant expression.
    /// </summary>
    public class SqlConstantExpression
        : SqlExpression
        , IConstantExpression
    {
        /// <summary>
        /// TODO:
        /// </summary>
        object IConstantExpression.Value => throw new System.NotImplementedException();
    }
}
