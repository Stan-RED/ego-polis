using System;

namespace Codesophy.Environment
{
    /// <summary>
    /// Getting date and time from the runtime environment.
    /// </summary>
    /// 
    /// <remarks>
    /// <para>
    ///     Direct calls to <see cref="DateTime.Now"/> or <see cref="DateTime.UtcNow"/>
    ///     should be definitely avoided as a barely testable and far from being
    ///     flexible.
    /// </para>
    /// 
    /// <todo>
    ///     I have some doubts regarding the name, especially suffix.
    /// </todo>
    /// 
    /// </remarks>
    public interface ITimeService
    {
        /// <summary>
        /// Get current date and time from the runtime environment.
        /// </summary>
        /// 
        /// <returns>
        /// Current date and time from the runtime environment.
        /// </returns>
        DateTimeOffset Get();
    }
}
