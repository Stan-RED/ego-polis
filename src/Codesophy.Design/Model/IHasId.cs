namespace Codesophy.Model
{
    /// <summary>
    /// Defining model with unique object identifier.
    /// </summary>
    /// 
    /// <typeparam name="T">
    /// Type of the identifier.
    /// </typeparam>
    public interface IHasId<T>
    {
        /// <summary>
        /// Object identifier.
        /// </summary>
        T Id { get; }
    }
}
