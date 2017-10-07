using System;
using Codesophy.Model.Code.Sql;

namespace Codesophy.Process.Code.Sql
{
    /// <summary>
    /// TODO: This transformation is responsible for processing some <see cref="Type"/>
    /// and create procedure based on it (signature is based on type's properties).
    /// 
    /// TODO: Name is far from being good.
    /// TODO: ITransform is better than IConvert?
    /// </summary>
    public class SqlProcedureTransform : IConvert<Type, SqlFunctionExpression>
    {
        SqlFunctionExpression IProcess<Type, SqlFunctionExpression>.When(Type when)
        {
            throw new NotImplementedException();
        }
    }
}
