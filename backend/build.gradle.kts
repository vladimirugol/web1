plugins {
    id("java")
    id("application")
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(files("libs/gson-2.10.1.jar"))
    implementation(files("libs/fastcgi-lib.jar"))
}

tasks.jar {
    manifest {
        attributes("Main-Class" to "org.example.Main")
    }
    from({
        configurations.runtimeClasspath.get()
            .filter { it.name.endsWith(".jar") }
            .map { zipTree(it) }
    })

    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}
