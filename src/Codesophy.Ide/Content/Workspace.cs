using Codesophy.Model;
using Codesophy.Model.Relation;

namespace Codesophy.Content
{
    /// <summary>
    /// Defining hierarchical scopes to organize content.
    /// </summary>
    /// <remarks>
    /// <para>
    ///     A good way to define context of our content for its
    ///     tasks, users, vocabularies, etc.
    /// </para>
    /// <para>
    ///     Consequently also a good way to partition/shard application's
    ///     data.
    /// </para>
    /// <para>
    ///     Workspaces are organized in a hierarchical manner.
    /// </para>
    /// 
    /// </remarks>
    public class Workspace
        : IArtifact
        , IAdjacent<ArtifactId>
        , IEntity<Workspace>
    {
        /// <summary>
        /// Uniquely identify workspace.
        /// </summary>
        ArtifactId IHasId<ArtifactId>.Id { get; }

        /// <summary>
        /// Identify parent <see cref="Workspace"/> if exists.
        /// </summary>
        ArtifactId? IAdjacent<ArtifactId>.Parent { get; }
    }
}
