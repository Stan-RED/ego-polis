namespace Codesophy.Model
{
    /// <summary>
    /// Defining model with unique object identifier.
    /// </summary>
    /// 
    /// <typeparam name="TKey">
    /// Type of the identifier.
    /// </typeparam>
    public interface IHasId<TKey>
    {
        /// <summary>
        /// Object identifier.
        /// </summary>
        TKey Id { get; }
    }
}
