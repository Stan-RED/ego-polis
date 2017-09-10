using Codesophy.Model;
using System;

namespace Codesophy.Configuration
{
    /// <summary>
    /// <see cref="ISetting{TValue}"/> implementation to get settings from
    /// &lt;appSettings&gt; section in .config files.
    /// </summary>
    /// <typeparam name="TValue">
    /// Setting value type.
    /// </typeparam>
    public class AppSetting<TValue> : ISetting<TValue>, IHasUniqueName
    {
        private readonly string _Name;
        private readonly TValue _Value;
        private readonly bool _Exists;

        private AppSetting(string name, TValue value, bool exists)
        {
            _Name = name ?? throw new ArgumentNullException(nameof(name));
            _Value = value;
            _Exists = exists;
        }

        public AppSetting(string name, TValue value)
            : this(name, value, true)
        {

        }

        public AppSetting(string name)
            : this(name, default(TValue), false)
        {

        }

        #region -- IHasUniqueName interface --------------------------------------------------------
        string IHasName.Name => _Name;
        #endregion ---------------------------------------------------------------------------------

        #region -- ISetting<T> interface -----------------------------------------------------------
        /// <inheritdoc />
        bool ISetting<TValue>.Exists => _Exists;

        /// <inheritdoc />
        TValue ISetting<TValue>.Value => _Value;

        /// <inheritdoc />
        Exception ISetting<TValue>.Exception(Exception innerException)
            => new AppSettingException(_Name, innerException)
        ;
        #endregion ---------------------------------------------------------------------------------
    }
}
