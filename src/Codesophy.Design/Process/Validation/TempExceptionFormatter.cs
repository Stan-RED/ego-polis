using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text.RegularExpressions;
using Codesophy.Configuration;
using Codesophy.Model.Validation;

namespace Codesophy.Process.Validation
{
    /// <summary>
    /// TODO:Temporary hard-coded low-quality solution, later should be improved with
    /// resource/template-based stuff.
    /// </summary>
    public class TempExceptionFormatter : IExceptionFormatter
    {
        private static readonly Regex _regex = new Regex(@"\$([_\w]+)");

        private Dictionary<Type, string> _templates = new Dictionary<Type, string>()
        {
            { typeof(MissingValueException), "is missing" },
            { typeof(AppSettingException), "App.config setting [$Name] $_" },
            { typeof(EnvironmentVariableException), "Environment variable [$Name] $_" }
        };

        string IProcess<Exception, string>.When(Exception when)
        {
            var type = when.GetType();
            var template = _templates[when.GetType()];

            return _regex.Replace(template, match =>
            {
                var property = match.Groups[1].Value;

                return property == "_"
                    ? (this as IExceptionFormatter).When(when.InnerException)
                    : type
#if !NETSTANDARD1_3
                        .GetProperty(property)
#else
                        .GetTypeInfo().GetDeclaredProperty(property)
#endif
                        .GetValue(when)?.ToString()
                ;
            });
        }
    }
}
