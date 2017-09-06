namespace NPandora.Model.Validation
{
    /// <summary>
    /// Useful method extensions for <see cref="IValidator{TModel}"/>.
    /// </summary>
    public static class IValidatorExtensions
    {
        /// <summary>
        /// TODO:Base <see cref="IValidator{TModel}.Validate(TModel)"/> methods does not
        /// throw exception, so with this extension we can ensure.
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <param name="validator"></param>
        /// <param name="model"></param>
        public static void Ensure<TModel>(this IValidator<TModel> validator, TModel model)
        {
            var exception = validator.Validate(model);

            if (exception != null)
            {
                throw exception;
            }
        }
    }
}
