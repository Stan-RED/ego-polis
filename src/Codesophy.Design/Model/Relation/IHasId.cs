namespace Codesophy.Model.Relation
{
    /// <summary>
    /// TODO:This interface is responsible to mark classes having unique identifier.
    /// </summary>
    /// <typeparam name="TKey">
    /// Type of the unique <see cref="Id">identifier</see>.
    /// </typeparam>
    public interface IHasId<TKey>
    {
        TKey Id { get; }
    }
}
