using System.Runtime.CompilerServices;
using Codesophy.Process.Validation;

namespace Codesophy.Model.Validation
{
    /// <summary>
    /// TODO:
    /// </summary>
    /// <remarks>
    /// TODO:SOLID (SRP exceptions), define term "semantic exceptions". System.Exception
    /// could not be responsible for all.
    /// 
    /// TODO:Exception and its formatting are two different responsibilities. And
    /// definitely coder is not a good "formatter", so textual exceptions should be
    /// avoided almost completely.
    /// 
    /// TODO:SOLID exceptions should encapsulate checking logic. E.g. malformed e-mmail
    /// exception. It's rules belongs to IETF, not to the particular business domain.
    /// TODO: Laying on exception's message is not a good idea. We can't easily reformat
    /// message, we will get problems with translated messages. It should be in opposite
    /// manner, semantic exception may be the key for resource.
    /// 
    /// TODO:Probably we should avoid messages at all. This depends on formatting engine
    /// that may be implemented using <see cref="IExceptionFormatter"/>. And this is
    /// a good side of semantic exceptions. Semantic exception we can render in different
    /// ways, formats (JsonFormatter), translate, etc. Just compare Exception("User not
    /// found exception") and EntityNotFoundException(typeof(User)). May be implement a
    /// good demo for text/json/localization format.
    /// 
    /// TODO:Sample how the same exception (e.g. <see cref="MissingValueException"/>
    /// can be used in configuration, in model validation, etc.).
    /// </remarks>
    [CompilerGenerated]
    internal class NamespaceDoc
    {

    }
}
