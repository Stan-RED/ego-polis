//WORK:
//namespace EnergyBill.Application.Configuration
//{
//    ////////////////////////////////////////////////////////////////////////////////////////////////
//    /// <summary>
//    /// Useful method extensions for <see cref="ISetting{T}"/> interface.
//    /// </summary>
//    ////////////////////////////////////////////////////////////////////////////////////////////////
//    public static class ISettingExtensions
//    {
//        ////////////////////////////////////////////////////////////////////////////////////////////
//        /// <summary>
//        /// Get andatory setting.
//        /// </summary>
//        /// <typeparam name="T">
//        /// Type of the setting's value.
//        /// </typeparam>
//        /// <param name="setting">
//        /// Setting interface.
//        /// </param>
//        /// <returns>
//        /// Returns setting value.
//        /// </returns>
//        /// <exception cref="SettingNotExists">
//        /// If setting does not exists, the <see cref="SettingNotExists"/> exception is thrown
//        /// wrapped by particual setting implementation.
//        /// </exception>
//        ////////////////////////////////////////////////////////////////////////////////////////////
//        public static T Require<T>(this ISetting<T> setting)
//        {
//            if (setting.Exists)
//            {
//                return setting.Value;
//            }

//            throw setting.Throw(new SettingNotExists());
//        }

//        ////////////////////////////////////////////////////////////////////////////////////////////
//        /// <summary>
//        /// Return default value if setting does not exists.
//        /// </summary>
//        /// <typeparam name="T">
//        /// Type of the setting's value.
//        /// </typeparam>
//        /// <param name="setting">
//        /// Setting interface.
//        /// </param>
//        /// <param name="default">
//        /// Default value.
//        /// </param>
//        /// <returns>
//        /// Returns setting's value or default value if it does not exists.
//        /// </returns>
//        ////////////////////////////////////////////////////////////////////////////////////////////
//        public static T Default<T>(this ISetting<T> setting, T @default)
//        {
//            return setting.Exists ? setting.Value : @default;
//        }
//    }
//}
