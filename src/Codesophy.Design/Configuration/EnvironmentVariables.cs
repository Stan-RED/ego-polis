using System.Collections.Generic;
using Codesophy.Process;

namespace Codesophy.Configuration
{
    /// <summary>
    /// TODO:Temporary solution. Refine among with <see cref="AppSettingProvider"/>
    /// probably using some shareable <see cref="DictionarySettingProvider"/>.
    /// And add more tests.
    /// </summary>
    public class EnvironmentVariables : ISettingProvider<string, string>
    {
        private IDictionary<string, string> _dictionary;

        #region ISettingProvider interface ---------------------------------------------------------
        /// <inheritdoc />
        ISetting<string> IProcess<string, ISetting<string>>.When(string when)
        {
            //TODO:
            return _dictionary.TryGetValue(when, out string value)
                ? new EnvironmentVariable<string>(when, value)
                : EnvironmentVariable<string>.NotExists(when)
            ;
        }
        #endregion ---------------------------------------------------------------------------------

        public EnvironmentVariables(IDictionary<string, string> dictionary)
        {
            _dictionary = dictionary;
        }
    }
}
