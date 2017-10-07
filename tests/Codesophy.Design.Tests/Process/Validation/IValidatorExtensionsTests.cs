using System;
using Codesophy.Quality;
using NSubstitute;
using Xunit;

namespace Codesophy.Process.Validation
{
    public class IValidatorExtensionsTests
    {
        private IValidator<string> _validator;

        public IValidatorExtensionsTests()
        {
            _validator = Substitute.For<IValidator<string>>();
        }

        /// <summary>
        /// When <see cref="IValidator{TModel}"/> returns some exception, this exception
        /// should be thrown. This is a main goal of
        /// <see cref="IValidatorExtensions.Ensure{TModel}(IValidator{TModel}, TModel)"/>
        /// method.
        /// </summary>
        [Fact]
        public void Ensure_ValidateReturnsException_ExceptionThrown()
        {
            var expected = new TestException();
            _validator.When(Arg.Any<string>()).Returns(expected);

            var actual = Assert.Throws<TestException>(() => _validator.Ensure("model"));

            Assert.Equal(expected, actual);
        }

        /// <summary>
        /// If no exception is returned from <see cref="IValidator{TModel}"/> then
        /// model expected to be valid we can let things go on.
        /// </summary>
        [Fact]
        public void Ensure_ValidateReturnsNull_NoExceptionThrown()
        {
            _validator.When(Arg.Any<string>()).Returns((Exception)null);

            var e = Record.Exception(() => _validator.Ensure("model"));

            Assert.Null(e);
        }
    }
}
