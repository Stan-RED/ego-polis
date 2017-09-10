using System;

namespace Codesophy.Configuration
{
    /// <summary>
    /// TODO:Exception thrown by incorrect app.config setting.
    /// </summary>
    public class AppSettingException : Exception
    {
        public string Name { get; }

        public AppSettingException(string name, Exception innerException)
            : base(name, innerException)
        {
            Name = name;
        }
    }
}
