using System;

namespace Codesophy.Model.Validation
{
    /// <summary>
    /// This interface is responsible for validating some instance of the specific
    /// <typeparamref name="TModel">model</typeparamref>.
    /// </summary>
    /// <typeparam name="TModel">
    /// Type of the object that can be validated behind this interface.
    /// </typeparam>
    /// <remarks>
    /// <para>
    /// <see cref="IValidator{TModel}"/> itself does not responsible for throwing
    /// exceptions. It just returns <see cref="InvalidValueException">exception</see>,
    /// because in our design is they are responsible for invalid values and models
    /// system. A good option is to return <see cref="InvalidModelException"/> from
    /// the <see cref="Validate(TModel)">validation method</see>.
    /// </para>
    /// </remarks>
    public interface IValidator<TModel>
    {
        /// <summary>
        /// Validation method. Returns exception if input <paramref name="model"/>
        /// is invalid or null otherwise.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Exception Validate(TModel model);
    }
}
