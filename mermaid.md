

##test
```mermaid
graph TD
    subgraph User Interaction
        A[Bank Business User] --> B(Chat Interface / UI)
    end

    subgraph Orchestration & API
        B --> C{API Gateway}
        C --> D[RAG Orchestration Framework<br>(LangChain / LlamaIndex)]
    end

    subgraph Retrieval Layer
        D -- Query --> E[Query Embedding Module]
        D -- Structured Filters / Exact Match --> F{Hybrid Search Logic}
        E -- Embeddings --> F
        F --> G[Re-ranking Module]
    end

    subgraph Data Sources & Indexing
        subgraph Data Lakehouse
            MinIO[MinIO Object Storage<br>(Parquet Files)]
            Iceberg[Apache Iceberg Table Format<br>(Metadata & Catalog)]
            MinIO -- stores --> Iceberg
        end

        subgraph Data Access & Pre-processing
            Trino[Trino Query Engine]
            SparkDask[Apache Spark / Dask Cluster]
            Trino --- Iceberg
            SparkDask -- Reads via JDBC/Trino Connector --> Trino
        end

        subgraph Indexing Pipeline
            SparkDask -- Processed Data + Metadata --> H[Intelligent Chunking Module]
            H -- Chunks --> I[Embedding Model]
            I -- Embeddings --> J[Vector Database<br>(e.g., Weaviate, Pinecone, Milvus)]
        end
        Iceberg --- Trino
        J --- G
        Trino -- Direct Lookup/Filtering --> F
    end

    subgraph Generation Layer
        G -- Top N Context Chunks --> K[Prompt Engineering]
        K --> L[Large Language Model (LLM)]
    end

    subgraph Output
        L --> M[Generated Answer]
        M --> B
    end
```

    style MinIO fill:#f9f,stroke:#333,stroke-width:2px
    style Iceberg fill:#a2e,stroke:#333,stroke-width:2px,color:#fff
    style Trino fill:#8c6,stroke:#333,stroke-width:2px
    style J fill:#bbf,stroke:#333,stroke-width:2px
    style L fill:#fcd,stroke:#333,stroke-width:2px
