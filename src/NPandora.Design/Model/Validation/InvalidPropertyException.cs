using System.Collections.Generic;
using System.Reflection;

namespace NPandora.Model.Validation
{
    /// <summary>
    /// TODO:
    /// </summary>
    public class InvalidPropertyException
    {
        public IEnumerable<InvalidValueException> Exceptions { get; }

        public PropertyInfo Property { get; }
    }
}
