using NPandora.Configuration;

namespace NPandora.Model.Validation
{
    /// <summary>
    /// Exception responsible for situations where some value is invalid.
    /// </summary>
    /// <remarks>
    /// <para>
    /// This exception doesn't have information about source of the value. Just the fact of
    /// value's problems. The source depends on the context. For example,
    /// <see cref="InvalidPropertyException"/> defines
    /// <see cref="InvalidPropertyException.Property"/> as a source of possible
    /// <see cref="InvalidPropertyException.Exceptions"/>. On the other side we can
    /// use the same exception when working with
    /// <see cref="ISetting{TValue}">settings</see>.
    /// </para>
    /// 
    /// <para>
    /// <see cref="InvalidValueException"/> is not intended to be used directly. It's
    /// responsible of being the base for the system of semantic exceptions like
    /// <see cref="MissingValueException"/>, <see cref="MalformedValueException"/>,
    /// <see cref="InvalidModelException"/> and others. Including business-specific
    /// exceptions.
    /// </para>
    /// 
    /// </remarks>
    public abstract class InvalidValueException
    {

    }
}
