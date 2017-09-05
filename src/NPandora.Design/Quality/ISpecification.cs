using System;

namespace NPandora.Quality
{
    public interface ISpecification
    {
        Exception Check();
    }
}
