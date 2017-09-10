using Codesophy.Quality;
using NSubstitute;
using NUnit.Framework;
using System;

namespace Codesophy.Model.Validation
{
    public class IValidatorExtensionsTests
    {
        private IValidator<string> _validator;

        [SetUp]
        public void SetUp()
        {
            _validator = Substitute.For<IValidator<string>>();
        }

        /// <summary>
        /// When <see cref="IValidator{TModel}"/> returns some exception, this exception
        /// should be thrown. This is a main goal of
        /// <see cref="IValidatorExtensions.Ensure{TModel}(IValidator{TModel}, TModel)"/>
        /// method.
        /// </summary>
        [Test]
        public void Ensure_ValidateReturnsException_ExceptionThrown()
        {
            var expected = new TestException();
            _validator.Validate(Arg.Any<string>()).Returns(expected);

            var actual = Assert.Throws<TestException>(() => _validator.Ensure("model"));

            Assert.That(actual, Is.EqualTo(expected));
        }

        /// <summary>
        /// If no exception is returned from <see cref="IValidator{TModel}"/> then
        /// model expected to be valid we can let things go on.
        /// </summary>
        [Test]
        public void Ensure_ValidateReturnsNull_NoExceptionThrown()
        {
            _validator.Validate(Arg.Any<string>()).Returns((Exception)null);

            Assert.DoesNotThrow(() => _validator.Ensure("model"));
        }
    }
}
