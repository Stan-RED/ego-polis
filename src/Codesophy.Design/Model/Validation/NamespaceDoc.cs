using System.Runtime.CompilerServices;

namespace Codesophy.Model.Validation
{
    /// <summary>
    /// TODO:
    /// </summary>
    /// <remarks>
    /// TODO:SOLID, semantic exceptions. System.Exception could not be responsible for all.
    /// TODO:SOLID exceptions should encapsulate checking logic. E.g. malformed e-mmail
    /// exception. It's rules belongs to IETF, not to the particular business domain.
    /// TODO: Laying on exception's message is not a good idea. We can't easily reformat
    /// message, we will get problems with translated messages. It should be in opposite
    /// manner, semantic exception may be the key for resource.
    /// </remarks>
    [CompilerGenerated]
    internal class NamespaceDoc
    {

    }
}
