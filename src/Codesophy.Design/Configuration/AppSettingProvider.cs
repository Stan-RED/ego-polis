namespace Codesophy.Configuration
{
    /// <summary>
    /// TODO:Implementation of the <see cref="ISettingProvider{TKey, TValue}"/> that
    /// peeks settings from &lt;appSettings&gt; section of the *.config files.
    /// </summary>
    public class AppSettingProvider : ISettingProvider<string, string>
    {
        #region ISettingProvider interface ---------------------------------------------------------
        /// <inheritdoc />
        ISetting<string> ISettingProvider<string, string>.Get(string key)
        {
            throw new System.NotImplementedException(); //WORK:
        }
        #endregion ---------------------------------------------------------------------------------
    }
}
