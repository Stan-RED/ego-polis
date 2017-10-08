using Codesophy.Model;
using System;

namespace Codesophy.Configuration
{
    /// <summary>
    /// TODO:
    /// </summary>
    /// <remarks>
    /// TODO:Share with <see cref="AppSetting{TValue}"/>.
    /// </remarks>
    public class EnvironmentVariable<TValue> : ISetting<TValue>, IHasUniqueName
    {
        private readonly string _Name;
        private readonly TValue _Value;
        private readonly bool _Exists;

        private EnvironmentVariable(string name, TValue value, bool exists)
        {
            _Name = name ?? throw new ArgumentNullException(nameof(name));
            _Value = value;
            _Exists = exists;
        }

        public EnvironmentVariable(string name, TValue value)
            : this(name, value, true)
        {

        }

        public EnvironmentVariable(string name)
            : this(name, default(TValue), false)
        {

        }

        public static EnvironmentVariable<TValue> NotExists(string name)
            => new EnvironmentVariable<TValue>(name, default(TValue), false)
        ;

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
            => new EnvironmentVariableException(_Name, innerException)
        ;
        #endregion ---------------------------------------------------------------------------------
    }
}
