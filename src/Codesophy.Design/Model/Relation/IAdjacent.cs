namespace Codesophy.Model.Relation
{
    /// <summary>
    /// Interface for child-parent relations organized by key
    /// references.
    /// </summary>
    /// 
    /// <remarks>
    /// TODO:Probably not a good solution. Just influenced by 
    /// "adjacency list" pattern.
    /// </remarks>
    public interface IAdjacent<TKey>
        : IHasId<TKey>
        where TKey : struct
    {
        TKey? Parent { get; }
    }
}
