using System;
using System.Collections.Generic;
using Codesophy.Model.Validation;
using Codesophy.Process.Validation;
using Xunit;

namespace Codesophy.Configuration
{
    /// <summary>
    /// This demo shows a proper separation of resposibilities when working
    /// with settings.
    /// </summary>
    /// <remarks>
    /// <para>
    /// Let's imagine that your application requires some setting. So you have
    /// two responsibilities - getting the value and validation that it exists.
    /// An usually it looks like:
    /// </para>
    /// 
    /// <code>
    /// string IsDebugStr = ConfigurationManager.AppSettings["IsDebug"];
    /// if (IsDebugStr == null)
    /// {
    ///     throw new System.Exception("AppSettings setting for 'IsDebug' not found.");
    /// }
    /// 
    /// ...
    /// 
    /// string clientId = ConfigurationManager.AppSettings["ClientId"];
    /// if (string.IsNullOrEmpty(clientId))
    /// {
    ///     throw new Exception("Please add your crayon clientId to appSettings in web.config.");
    /// }
    /// 
    /// ... And numerous other samples those can be easily peeked from https://github.com.
    /// </code>
    /// 
    /// <para>
    /// As you might notice, error messages manage both responsibilities. They
    /// contains validation information ("not found", "please add") and source
    /// ("AppSettings", "appSettings in web.config"). What happens if tomorrow
    /// our application will scale and we decide to replace app.config file
    /// with distributed configuration stored in ZooKeeper? All these messages
    /// will be erroneous.
    /// </para>
    /// 
    /// <para>
    /// To solve this problem we use SRP design. Instead single exception we
    /// have two <see cref="Codesophy.Model.Validation">semantic</see>
    /// exceptions. The first one is <see cref="AppSettingException"/>,
    /// indicating that something happens in some &lt;appSettings&gt; entry.
    /// The second one - <see cref="MissingValueException"/> is responsible for
    /// validation and answers question "what happens". 
    /// </para>
    /// 
    /// <para>
    /// As a result or demos contains <see cref="BusinessValidationLogic(ISettingProvider{string, string})"/>
    /// method, that is absolutely independent of how the settings are stored.
    /// And two version of our application that uses different
    /// <see cref="ISettingProvider{TKey, TValue}">setting providers</see> -
    /// for <see cref="AppSettingProvider">app.config</see> file and for
    /// <see cref="EnvironmentVariables">environment variables</see> (for simplicity
    /// purposes, but can be replaced with Apache ZooKeeper implementation we mentioned
    /// before).
    /// </para>
    /// </remarks>
    public class ValidationDemos
    {
        public static readonly IDictionary<string, string> Settings = new Dictionary<string, string>();

        private readonly IExceptionFormatter _formatter;

        /// <summary>
        /// Business validation logic.
        /// </summary>
        /// <remarks>
        /// This part of application is absolutely independent of how settings
        /// are stored. We just work with <see cref="ISettingProvider{TKey, TValue}"/>
        /// contract provided in <paramref name="settings"/> to fetch required
        /// <see cref="ISetting{TValue}">setting</see>. And if it does not exists,
        /// we prepare <see cref="MissingValueException"/> and pass it to the
        /// <see cref="ISetting{TValue}.Exception(Exception)"/> method of the
        /// <see cref="ISetting{TValue}">setting</see>. It will wrap our "what
        /// happened" exception with "where happened" and we return then the
        /// small cascade of this two exceptions (formatted as string).
        /// </remarks>
        public string BusinessValidationLogic(ISettingProvider<string, string> settings)
        {
            var setting = settings.When("api-url");

            var exception = !setting.Exists
                ? setting.Exception(new MissingValueException())
                : null
            ;

            return _formatter.When(exception);
        }

        /// <summary>
        /// Validation using settings stored in app.config.
        /// </summary>
        /// <remarks>
        /// The requirements of this method is pretty simple. If we have
        /// app.config file as settings provider, then any validation
        /// messages should contain information about respective
        /// &lt;appSettings&gt; entry.
        /// </remarks>
        [Fact]
        public void UseAppSettings()
        {
            ISettingProvider<string, string> settings = new AppSettingProvider(Settings);

            var message = BusinessValidationLogic(settings);

            Assert.Equal("<appSettings> entry [api-url] is missing", message);
        }

        /// <summary>
        /// Validation using settings stored in environment variables.
        /// </summary>
        /// <remarks>
        /// The requirements of this method is pretty simple. If we environment
        /// variables as settings provider, then any validation messages should
        /// contain information about respective variable.
        /// </remarks>
        [Fact]
        public void UseEnvironmentalVariables()
        {
            ISettingProvider<string, string> settings = new EnvironmentVariables(Settings);

            var message = BusinessValidationLogic(settings);

            Assert.Equal("Environment variable [api-url] is missing", message);
        }

        public ValidationDemos()
        {
            _formatter = new TempExceptionFormatter();
        }
    }
}
