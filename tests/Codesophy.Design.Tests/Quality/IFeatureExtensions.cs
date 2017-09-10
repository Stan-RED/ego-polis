using Xunit;

namespace Codesophy.Quality
{
    /// <summary>
    /// Useful method extensions for <see cref="IFeature"/>.
    /// </summary>
    /// TODO:Move to Codesophy.Quality?
    public static class IFeatureExtensions
    {
        public static void Then<TValue>(this TValue actual, TValue expected)
        {
            Assert.Equal(expected, actual);
        }
    }
}
