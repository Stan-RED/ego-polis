using NPandora.Model.Validation;
using System;

namespace NPandora.Configuration
{
    /// <summary>
    /// This interface is responsible for delivering some setting value while hiding the way,
    /// this value was mined.
    /// </summary>
    /// <typeparam name="TValue">
    /// Type of the value.
    /// </typeparam>
    /// <remarks>
    /// 
    /// <para>
    /// Let's consider an example that we're getting some setting from &lt;appSettings&gt;
    /// section of the app.config file. Being SOLID developers we encapsulate app.config
    /// access behind some IAppSettings contract. This helps us further to replace
    /// implementation without a headache.
    /// </para>
    /// 
    /// <para>
    /// Having the setting retrieved we might want to validate the value. For example that it
    /// exists and throws exception if it doesn't. Definitely it will be helpful to write
    /// details that "You should provide XYZ setting in your app.config file". But we don't
    /// know how settings are implemented. And even if we throw manually crafted exception,
    /// it will be fragile. Because any change behind a settings access interface like replacing
    /// app.config with registry access or .conf file with another format makes all our
    /// messages senseless.
    /// </para>
    /// 
    /// <para>
    /// So we have two separate concerns. Business logic that is responsible for validation
    /// process and setting retrieval that stores information about setting details. As a
    /// result we get from the <see cref="ISetting{TValue}"/> information about its
    /// <see cref="ISetting{TValue}.Value">value</see> (and its
    /// <see cref="ISetting{TValue}.Exists">existance</see> as part of the value). And
    /// after validation we can send back our business-logic exception, that will be
    /// wrapped into setting-specific exception.
    /// </para>
    /// 
    /// <para>
    /// TODO:Looks like <see cref="Nullable{T}"/>.
    /// </para>
    /// </remarks>
    /// <example>
    ///     TODO:Examples.
    ///     <see cref="MissingValueException"/>.
    /// </example>
    public interface ISetting<TValue>
    {
        TValue Value { get; }

        bool Exists { get; }

        Exception Exception(Exception innerException);
    }
}
