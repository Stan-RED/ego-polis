using System;

namespace Codesophy.Configuration
{
    /// <summary>
    /// TODO:Exception thrown by incorrect environmental variable.
    /// </summary>
    public class EnvironmentVariableException : Exception
    {
        public string Name { get; }

        public EnvironmentVariableException(string name, Exception innerException)
            : base(name, innerException)
        {
            Name = name;
        }
    }
}
