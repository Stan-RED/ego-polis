using System.Runtime.CompilerServices;

namespace Codesophy.Configuration
{
    /// <summary>
    /// The way application is running may depends on its runtime environment
    /// that may provide some settings using environmental variables,
    /// configuration files, etc.
    /// </summary>
    /// 
    /// <remarks>
    /// <para>
    /// The essential atom of the configuration is a <see cref="ISetting{TValue}"/>
    /// contract. That provides the setting's value we are looking for.
    /// </para>
    /// 
    /// <para>
    /// Multiple similar settings from the same source may be aggregated using
    /// some specific <see cref="ISettingProvider{TKey, TValue}"/> that can fetch
    /// values from <see cref="AppSettingProvider">app.config</see> file.
    /// </para>
    /// 
    /// TODO:Implement settings for app.config. Some IApplicationSettings interface
    /// with wrapper for app.config -> appSettings. With prefixes and other key
    /// transformation support.
    /// 
    /// TODO:Extensions for ISetting (Require, Validate), like throw, IsDefault, etc.
    /// 
    /// TODO:Reference to model exceptions like InvalidValueException as usage sample.
    /// 
    /// TODO:May be some settings deserialization tool. So I may have just a class and
    /// some settings provider that will handle (de)serialization stuff.
    /// 
    /// TODO:Somehow we should differ read-only settings from configuration process.
    /// 
    /// TODO: Besides settings in app.config we can also implement settings from
    /// environment variables and have some settings that can build a cascade of
    /// settings (e.g. environmental may override app.config).
    /// 
    /// TODO: Think about reactive settings.
    /// </remarks>
    [CompilerGenerated]
    internal class NamespaceDoc
    {

    }
}
