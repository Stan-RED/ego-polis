using Codesophy.Data;
using Codesophy.Model;

namespace Codesophy.Workspace
{
    /// <summary>
    /// Defining scopes of our activity to organize it.
    /// </summary>
    /// <remarks>
    /// <para>
    ///     A good way to define context of our ongoing work with its
    ///     tasks, users, vocabularies, etc.
    /// </para>
    /// <para>
    ///     Consequently also a good way to partition/shard application's
    ///     data.
    /// </para>
    /// <para>
    ///     Workspaces are organize in a hierarchical manner.
    /// </para>
    /// </remarks>
    public class Workspace
        : IHasId
    {
        /// <summary>
        /// Uniquely identify workspace.
        /// </summary>
        uint IHasId<uint>.Id { get; }

        /// <summary>
        /// Identify parent <see cref="Workspace"/> if exists.
        /// </summary>
        uint? Parent { get; }
    }
}
